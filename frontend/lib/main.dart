import 'package:flutter/material.dart';
// Import your screens
import '../components/mood_check_screen.dart'; // Make sure to create this file with the MoodCheckScreen code
import '../components/mental_health_welcome_screen.dart'; // Make sure to create this file with the MentalHealthWelcomeScreen code

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mental Health App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      // Start with mood check screen
      home: const MoodCheckScreen(),
      routes: {
        '/home': (context) => const MyHomePage(title: 'Flutter Demo Home Page'),
        '/mood': (context) => const MoodCheckScreen(),
        '/mental-health-welcome': (context) => const MentalHealthWelcomeScreen(),
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
        actions: [
          // Add button to navigate back to mood screen
          IconButton(
            icon: const Icon(Icons.mood),
            onPressed: () {
              Navigator.pushNamed(context, '/mood');
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Welcome to your Mental Health Journey!'),
            const SizedBox(height: 20),
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 20),
            // Add button to navigate back to mood screen
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/mood');
              },
              child: const Text('Check Mood Again'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}