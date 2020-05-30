import 'package:flutter/material.dart';
import 'package:CGod/Menu.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CGod',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.red,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: Menu(),
    );
  }
}
