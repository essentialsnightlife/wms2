import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
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
    fontWeight: "bold"
  },
  col2: {
    padding: 5,
  },
});

type Props = { order: any };

const WarehouseNotes: React.FunctionComponent<Props> = ({ order }) => (
  <View style={styles.mainCont}>
    <Text style={styles.title}>Warehouse Notes</Text>

    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.col1}>Final Comments</Text>
        <Text style={styles.col2}>{order.final_comments}</Text>
      </View>
      {order.qc_pics && (
        <View style={styles.row}>
          <Text style={styles.col1}>Quality Control Pics</Text>
          {order.qc_pics.map((url) => (
            <Text style={styles.col2}>
              <Link src={url} >
                Link
              </Link>
            </Text>
          ))}
        </View>
      )}
    </View>
  </View>
);

export default WarehouseNotes;
