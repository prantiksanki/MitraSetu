import 'package:flutter/material.dart';
import 'package:mitra_setu/services/api_service.dart';

const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure',
  'Trouble concentrating on things',
  'Moving or speaking so slowly that other people could have noticed',
  'Thoughts that you would be better off dead'
];

const gad7Questions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen'
];

class ScreeningScreen extends StatefulWidget {
  const ScreeningScreen({super.key});

  @override
  State<ScreeningScreen> createState() => _ScreeningScreenState();
}

class _ScreeningScreenState extends State<ScreeningScreen> {
  final ApiService _api = ApiService();
  String _testType = 'phq9';
  int _index = 0;
  List<int> _answers = List.filled(9, 0);

  List<String> get questions => _testType == 'phq9' ? phq9Questions : gad7Questions;

  void _setAnswer(int value) {
    setState(() {
      _answers[_index] = value;
    });
  }

  Future<void> _submit() async {
    final answers = _testType == 'phq9' ? _answers.sublist(0, 9) : _answers.sublist(0, 7);
    late final response;
    if (_testType == 'phq9') {
      response = await _api.submitPhq9(answers);
    } else {
      response = await _api.submitGad7(answers);
    }

    if (response.statusCode == 200) {
      final body = response.body;
      // Simple feedback
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Result'),
          content: Text(body),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context), child: const Text('OK'))
          ],
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Failed to submit')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final q = questions[_index];
    return Scaffold(
      appBar: AppBar(title: const Text('Screening')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            Row(
              children: [
                const Text('Test: '),
                DropdownButton<String>(
                  value: _testType,
                  items: const [
                    DropdownMenuItem(value: 'phq9', child: Text('PHQ-9')),
                    DropdownMenuItem(value: 'gad7', child: Text('GAD-7')),
                  ],
                  onChanged: (v) {
                    setState(() {
                      _testType = v!;
                      _index = 0;
                      _answers = List.filled(_testType == 'phq9' ? 9 : 7, 0);
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text('Question ${_index + 1}/${questions.length}', style: const TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text(q, style: const TextStyle(fontSize: 18)),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              children: List.generate(4, (i) {
                return ChoiceChip(
                  label: Text('$i'),
                  selected: _answers[_index] == i,
                  onSelected: (_) => _setAnswer(i),
                );
              }),
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: _index > 0 ? () => setState(() => _index--) : null,
                  child: const Text('Previous'),
                ),
                if (_index < questions.length - 1)
                  ElevatedButton(onPressed: () => setState(() => _index++), child: const Text('Next'))
                else
                  ElevatedButton(onPressed: _submit, child: const Text('Submit'))
              ],
            )
          ],
        ),
      ),
    );
  }
}
