import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const borderColor = "#000";
const styles = StyleSheet.create({
  mainCont: {
    width: "50%",
    marginBottom: 20,
  },
  title: {
    fontStyle: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flexDirection: "column",
    borderColor: borderColor,
    color: "#000",
    borderWidth: 1,
    alignItems: "flex-start",
    fontStyle: "bold",
  },
  row: {
    flexDirection: "row",
    borderColor: borderColor,
    width: "100%",
    borderWidth: 1,
  },
  col1: {
    borderRightColor: borderColor,
    color: "#000",
    borderRightWidth: 1,
    padding: 5,
  },
  col2: {
    padding: 5,
  },
});

type Props = { order: any, specifics:any };

const TaskSpecificDetails: React.FunctionComponent<Props> = ({ order, specifics }) => (
  <View style={styles.mainCont}>
    <Text style={styles.title}>Task Specific Details</Text>

    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.col1}>Specific Field 1</Text>
        <Text style={styles.col2}></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col1}>Specific Field 1</Text>
        <Text style={styles.col2}></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col1}>Thread Color</Text>
        <Text style={styles.col2}>{specifics.threadColour?specifics.threadColour:"n/a"}</Text>
      </View>
    </View>
  </View>
);

export default TaskSpecificDetails;
