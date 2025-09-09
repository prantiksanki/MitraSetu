import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:eventsource/eventsource.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/chat_bloc.dart';
import '../blocs/chat_event.dart';
import '../blocs/chat_state.dart';
import '../services/storage_service.dart';
import '../models/message.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _controller = TextEditingController();
  final _storage = StorageService();
  EventSource? _es;
  int _reconnectAttempts = 0;

  void _startStream(String message) async {
    final token = await _storage.getToken();
    final url = Uri.parse('http://192.168.1.7:5000/api/chat');

    // Start EventSource POST streaming
    final es = await EventSource.connect(
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token ?? '',
      },
      body: jsonEncode({'message': message}),
    );

    // Dispatch initial send event
    context.read<ChatBloc>().add(SendMessage(message));

    es.listen((Event event) {
      if (event.data != null && event.data!.isNotEmpty) {
        final parsed = jsonDecode(event.data!);
        final chunk = parsed['reply'] as String;
        context.read<ChatBloc>().add(ReceiveChunk(chunk));
      }
    }, onDone: () {
      context.read<ChatBloc>().add(StreamComplete());
    }, onError: (err) {
      print('Stream error: $err');
      context.read<ChatBloc>().add(StreamComplete());
    });
  }

  void _startSSE(String token, String prompt) async {
    try {
      _es = await EventSource.connect(
        'http://192.168.1.7:5000/api/chat',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        body: '{"prompt": "${prompt.replaceAll('"', '\\"')}"}'
      );

      _es?.listen((Event event) {
        if (event.data != null && event.data!.isNotEmpty) {
          try {
            final chunk = event.data!;
            context.read<ChatBloc>().add(ReceiveChunk(chunk));
          } catch (e) {
            // parsing error
          }
        }
      });

      _reconnectAttempts = 0;
    } catch (e) {
      _handleSseError(e);
    }
  }

  void _handleSseError(Object e) {
    _reconnectAttempts++;
    final delay = Duration(milliseconds: 500 * (_reconnectAttempts));
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Chat connection error - retrying...')));
    Future.delayed(delay, () async {
      // try reconnecting once or twice
      if (_reconnectAttempts <= 3) {
        // attempt to restart; in a real app we'd preserve token & prompt
        // here we just signal ChatBloc to attempt reconnect
        context.read<ChatBloc>().add(AttemptReconnect());
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Unable to reconnect to chat.')));
      }
    });
  }

  @override
  void dispose() {
    _es?.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('MitraSetu Chat')),
      body: Column(
        children: [
          Expanded(
            child: BlocBuilder<ChatBloc, ChatState>(
              builder: (context, state) {
                final messages = <Message>[];
                if (state is ChatStreaming) {
                  messages.addAll(state.messages);
                } else if (state is ChatComplete) {
                  messages.addAll(state.messages);
                }

                return ListView.builder(
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index];
                    return ListTile(
                      title: Align(
                        alignment: msg.isUser ? Alignment.centerRight : Alignment.centerLeft,
                        child: Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: msg.isUser ? Colors.blueAccent : Colors.grey[300],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(msg.text, style: TextStyle(color: msg.isUser ? Colors.white : Colors.black)),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(hintText: 'Type a message...'),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () {
                    final text = _controller.text.trim();
                    if (text.isNotEmpty) {
                      _startStream(text);
                      _controller.clear();
                    }
                  },
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
