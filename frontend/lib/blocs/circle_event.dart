import 'package:equatable/equatable.dart';

abstract class CircleEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class CreateCircle extends CircleEvent {
  final String name;
  CreateCircle(this.name);
  @override
  List<Object?> get props => [name];
}

class LoadCircle extends CircleEvent {
  final String id;
  LoadCircle(this.id);
  @override
  List<Object?> get props => [id];
}

class PostCircleMessage extends CircleEvent {
  final String circleId;
  final String message;
  PostCircleMessage(this.circleId, this.message);
  @override
  List<Object?> get props => [circleId, message];
}
