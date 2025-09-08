import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/circle_bloc.dart';
import '../blocs/circle_event.dart';
import '../blocs/circle_state.dart';

class CircleDetailScreen extends StatefulWidget {
  final String circleId;
  final String circleName;
  const CircleDetailScreen({super.key, required this.circleId, required this.circleName});

  @override
  State<CircleDetailScreen> createState() => _CircleDetailScreenState();
}

class _CircleDetailScreenState extends State<CircleDetailScreen> {
  final _messageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Load circle on open
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<CircleBloc>().add(LoadCircle(widget.circleId));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.circleName)),
      body: Column(
        children: [
          Expanded(
            child: BlocBuilder<CircleBloc, CircleState>(
              builder: (context, state) {
                if (state is CircleLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (state is CircleLoaded) {
                  final circle = state.circle;
                  final messages = (circle['messages'] as List<dynamic>?) ?? [];
                  return ListView.builder(
                    reverse: true,
                    itemCount: messages.length,
                    itemBuilder: (context, index) {
                      final msg = messages[messages.length - 1 - index];
                      final createdAtRaw = msg['createdAt'] ?? msg['created_at'] ?? '';
                      DateTime? createdAt;
                      try {
                        createdAt = DateTime.parse(createdAtRaw.toString());
                      } catch (_) {
                        createdAt = null;
                      }
                      final timeLabel = createdAt != null ? _formatTimestamp(createdAt) : createdAtRaw.toString();
                      final poster = (msg['userName'] ?? msg['user'] ?? 'Anonymous').toString();

                      return ListTile(
                        title: Text(msg['message'] ?? ''),
                        subtitle: Text('$poster • $timeLabel'),
                      );
                    },
                  );
                } else if (state is CircleError) {
                  return Center(child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('Error: ${state.error}'),
                      const SizedBox(height: 8),
                      ElevatedButton(onPressed: () {
                        context.read<CircleBloc>().add(LoadCircle(widget.circleId));
                      }, child: const Text('Retry'))
                    ],
                  ));
                }
                return const SizedBox.shrink();
              },
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _messageController,
                      decoration: const InputDecoration(hintText: 'Write a message...'),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: () {
                      final text = _messageController.text.trim();
                      if (text.isNotEmpty) {
                        context.read<CircleBloc>().add(PostCircleMessage(widget.circleId, text));
                        _messageController.clear();
                      }
                    },
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  String _formatTimestamp(DateTime dt) {
    final now = DateTime.now();
    final diff = now.difference(dt);
    if (diff.inSeconds < 60) return 'just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m';
    if (diff.inHours < 24) return '${diff.inHours}h';
    if (diff.inDays < 7) return '${diff.inDays}d';
    return '${dt.day}/${dt.month}/${dt.year}';
  }
}
