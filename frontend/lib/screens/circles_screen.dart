import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/circle_bloc.dart';
import '../blocs/circle_event.dart';
import '../blocs/circle_state.dart';
import 'circle_detail_screen.dart';

class CirclesScreen extends StatefulWidget {
  const CirclesScreen({super.key});

  @override
  State<CirclesScreen> createState() => _CirclesScreenState();
}

class _CirclesScreenState extends State<CirclesScreen> {
  final _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Circles')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _nameController,
                    decoration: const InputDecoration(hintText: 'Circle name'),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: () {
                    final name = _nameController.text.trim();
                    if (name.isNotEmpty) {
                      context.read<CircleBloc>().add(CreateCircle(name));
                      _nameController.clear();
                    }
                  },
                )
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: BlocConsumer<CircleBloc, CircleState>(
                listener: (context, state) {
                  if (state is CircleError) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: ${state.error}'), action: SnackBarAction(label: 'Retry', onPressed: () {
                        // a naive retry: re-create last attempted circle if possible
                      }),),
                    );
                  }
                },
                builder: (context, state) {
                  if (state is CircleInitial) {
                    return const Center(child: Text('Create or open a circle'));
                  } else if (state is CircleLoading) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (state is CircleLoaded) {
                    final circle = state.circle;
                    final messages = (circle['messages'] as List<dynamic>?) ?? [];
                    return ListView.builder(
                      itemCount: messages.length,
                      itemBuilder: (context, index) {
                        final msg = messages[index];
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
                          onTap: () {
                            // open circle detail screen
                            Navigator.push(context, MaterialPageRoute(builder: (_) => CircleDetailScreen(circleId: circle['_id'].toString(), circleName: circle['name'].toString())));
                          },
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
                          // simple retry: clear error and stay on initial
                          context.read<CircleBloc>().add(LoadCircle(''));
                        }, child: const Text('Retry'))
                      ],
                    ));
                  }
                  return const SizedBox.shrink();
                },
              ),
            )
          ],
        ),
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
