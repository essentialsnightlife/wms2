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

type Props = { order: any; brand: any };

const ClientInfo: React.FunctionComponent<Props> = ({ order, brand }) => (
  <View style={styles.mainCont}>
    <Text style={styles.title}>Client Information</Text>

    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.col1}>Name</Text>
        <Text style={styles.col2}>{order.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col1}>Brand</Text>
        <Text style={styles.col2}>{brand?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col1}>Email</Text>
        <Text style={styles.col2}>{order.email}</Text>
      </View>
    </View>
  </View>
);

export default ClientInfo;
