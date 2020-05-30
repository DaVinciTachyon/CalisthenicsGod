import 'package:flutter/material.dart';

class Food extends StatefulWidget {
  final String title;

  Food({Key key, this.title}) : super(key: key);

  @override
  _FoodState createState() => _FoodState();
}

class _FoodState extends State<Food> {
  @override
  Widget build(BuildContext context) {
    return Text('Food');
  }
}
