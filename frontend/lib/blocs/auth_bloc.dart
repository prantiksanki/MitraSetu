import 'package:flutter_bloc/flutter_bloc.dart';
import 'auth_event.dart';
import 'auth_state.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import 'dart:convert';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final ApiService apiService;
  final StorageService storageService;

  AuthBloc({required this.apiService, required this.storageService}) : super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
    on<RegisterRequested>(_onRegisterRequested);
    on<LogoutRequested>(_onLogoutRequested);
  }

  Future<void> _onLoginRequested(LoginRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    final response = await apiService.login(event.email, event.password);
    if (response.statusCode == 200) {
      final token = jsonDecode(response.body)['token'];
      await storageService.saveToken(token);
      emit(AuthAuthenticated());
    } else {
      emit(AuthUnauthenticated(error: response.body));
    }
  }

  Future<void> _onRegisterRequested(RegisterRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    final response = await apiService.register(event.name, event.email, event.password);
    if (response.statusCode == 200) {
      final token = jsonDecode(response.body)['token'];
      await storageService.saveToken(token);
      emit(AuthAuthenticated());
    } else {
      emit(AuthUnauthenticated(error: response.body));
    }
  }

  Future<void> _onLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) async {
    await storageService.deleteToken();
    emit(AuthUnauthenticated());
  }
}
