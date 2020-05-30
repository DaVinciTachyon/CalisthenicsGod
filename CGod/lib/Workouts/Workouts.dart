import 'package:flutter/material.dart';

class Workouts extends StatefulWidget {
  final String title;

  Workouts({Key key, this.title}) : super(key: key);

  @override
  _WorkoutsState createState() => _WorkoutsState();
}

class _WorkoutsState extends State<Workouts> {
  @override
  Widget build(BuildContext context) {
    return Text('Workouts');
  }
}
