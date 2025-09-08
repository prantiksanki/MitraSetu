import 'package:flutter/material.dart';

class MentalHealthWelcomeScreen extends StatelessWidget {
  const MentalHealthWelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('MitraSetu')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const SizedBox(height: 24),
            const Text('Welcome to MitraSetu', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/chat'),
              child: const Text('Chat with AI'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/screening'),
              child: const Text('Take a Screening'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/mood'),
              child: const Text('Mood Check'),
            ),
          ],
        ),
      ),
    );
  }
}