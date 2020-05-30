import 'package:flutter/material.dart';

class Measurements extends StatefulWidget {
  final String title;

  Measurements({Key key, this.title}) : super(key: key);

  @override
  _MeasurementsState createState() => _MeasurementsState();
}

class _MeasurementsState extends State<Measurements> {
  @override
  Widget build(BuildContext context) {
    return Text('Measurements');
  }
}
