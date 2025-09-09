import 'package:equatable/equatable.dart';

abstract class CircleState extends Equatable {
  @override
  List<Object?> get props => [];
}

class CircleInitial extends CircleState {}
class CircleLoading extends CircleState {}
class CircleLoaded extends CircleState {
  final Map<String, dynamic> circle;
  CircleLoaded(this.circle);
  @override
  List<Object?> get props => [circle];
}
class CircleError extends CircleState {
  final String error;
  CircleError(this.error);
  @override
  List<Object?> get props => [error];
}
