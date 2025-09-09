import 'package:flutter_bloc/flutter_bloc.dart';
import 'circle_event.dart';
import 'circle_state.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import 'dart:convert';
import 'dart:async';

class CircleBloc extends Bloc<CircleEvent, CircleState> {
  final ApiService _api = ApiService();

  CircleBloc() : super(CircleInitial()) {
    on<CreateCircle>(_onCreateCircle);
    on<LoadCircle>(_onLoadCircle);
    on<PostCircleMessage>(_onPostMessage);
  }

  Future<T> _withRetries<T>(Future<T> Function() fn, {int retries = 2, Duration initialDelay = const Duration(milliseconds: 500)}) async {
    int attempt = 0;
    Duration delay = initialDelay;
    while (true) {
      try {
        return await fn();
      } catch (e) {
        if (attempt >= retries) rethrow;
        await Future.delayed(delay);
        attempt++;
        delay *= 2;
      }
    }
  }

  Future<void> _onCreateCircle(CreateCircle event, Emitter<CircleState> emit) async {
    emit(CircleLoading());
    try {
      final res = await _withRetries(() => _api.createCircle(event.name));
      if (res.statusCode == 200) {
        // parse body safely
        final body = jsonDecode(res.body);
        emit(CircleLoaded(body));
      } else {
        emit(CircleError('Server error (${res.statusCode}): ${res.body}'));
      }
    } catch (e) {
      emit(CircleError('Network error: ${e.toString()}'));
    }
  }

  Future<void> _onLoadCircle(LoadCircle event, Emitter<CircleState> emit) async {
    emit(CircleLoading());
    try {
      final res = await _withRetries(() => _api.getCircle(event.id));
      if (res.statusCode == 200) {
        final body = jsonDecode(res.body);
        emit(CircleLoaded(body));
      } else {
        emit(CircleError('Server error (${res.statusCode}): ${res.body}'));
      }
    } catch (e) {
      emit(CircleError('Network error: ${e.toString()}'));
    }
  }

  Future<void> _onPostMessage(PostCircleMessage event, Emitter<CircleState> emit) async {
    // We deliberately do not emit a loading state to avoid blocking UI while posting
    try {
      final res = await _withRetries(() => _api.postCircleMessage(event.circleId, event.message));
      if (res.statusCode == 200) {
        final body = jsonDecode(res.body);
        emit(CircleLoaded(body));
      } else {
        emit(CircleError('Server error (${res.statusCode}): ${res.body}'));
      }
    } catch (e) {
      emit(CircleError('Network error: ${e.toString()}'));
    }
  }
}
