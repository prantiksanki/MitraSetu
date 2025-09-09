import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'services/api_service.dart';
import 'services/storage_service.dart';
import 'blocs/auth_bloc.dart';
import 'blocs/chat_bloc.dart';
import 'blocs/circle_bloc.dart';

// Import your screens
import 'components/mood_check_screen.dart';
import 'components/mental_health_welcome_screen.dart';
import 'components/ai_chatbot_welcome_screen.dart';
import 'components/chat_screen.dart';
import 'components/login_screen.dart';
import 'components/register_screen.dart';
import 'components/screening_screen.dart';
import 'components/circles_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final apiService = ApiService();
    final storageService = StorageService();

    final GoRouter _router = GoRouter(
      initialLocation: '/login',
      routes: [
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/register',
          builder: (context, state) => const RegisterScreen(),
        ),
        GoRoute(
          path: '/landing',
          builder: (context, state) => const MentalHealthWelcomeScreen(),
        ),
        GoRoute(
          path: '/home',
          builder: (context, state) => const MyHomePage(title: 'Setu - Mental Health'),
        ),
        GoRoute(
          path: '/mood',
          builder: (context, state) => const MoodCheckScreen(),
        ),
        GoRoute(
          path: '/screening',
          builder: (context, state) => const ScreeningScreen(),
        ),
        GoRoute(
          path: '/ai-chatbot-welcome',
          builder: (context, state) => const AiChatbotWelcomeScreen(),
        ),
        GoRoute(
          path: '/chat',
          builder: (context, state) => const ChatScreen(),
        ),
        GoRoute(
          path: '/circles',
          builder: (context, state) => const CirclesScreen(),
        ),
      ],
    );

    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) => AuthBloc(apiService: apiService, storageService: storageService),
        ),
        BlocProvider(
          create: (_) => ChatBloc(),
        ),
        BlocProvider(
          create: (_) => CircleBloc(),
        ),
      ],
      child: MaterialApp.router(
        title: 'MitraSetu - Mental Health App',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
          appBarTheme: AppBarTheme(
            backgroundColor: Colors.purple[700],
            foregroundColor: Colors.white,
            elevation: 0,
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
        ),
        routerConfig: _router,
      ),
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
        title: Text(widget.title),
        actions: [
          // Navigate to mood check
          IconButton(
            icon: const Icon(Icons.mood),
            onPressed: () {
              Navigator.pushNamed(context, '/mood');
            },
          ),
          // Logout
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/login',
                (route) => false,
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.purple[50],
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.psychology,
                    size: 60,
                    color: Colors.purple[700],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Welcome to your Mental Health Journey!',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 32),
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.pushNamed(context, '/mood');
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.purple[700],
                foregroundColor: Colors.white,
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              ),
              icon: const Icon(Icons.mood),
              label: const Text('Check Mood Again'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        backgroundColor: Colors.purple[700],
        foregroundColor: Colors.white,
        child: const Icon(Icons.add),
      ),
    );
  }
}

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Welcome to MitraSetu'),
      ),
    );
  }
}
