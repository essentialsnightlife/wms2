import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "../../public/logoOrange.png";
import ClientInfo from "./clientInfo";
import OrderSummary from "./orderSummary";
import InitialClientDetails from "./initialClientDetails";
import TaskSpecificDetails from "./taskSpecificDetails";
import WarehouseNotes from "./warehouseNotes";
import { findSpecificFieldsForOrder } from "../../data/services";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: "12px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: "30%",
  },
  titleCont: {
    width: "20%",
    textAlign: "left",
    marginBottom: 20,
  },
  title: {
    fontWeight: "heavy",
    fontSize: 30,
    color: "#F69E30",
  },
  subTitle: {
    textAlign: "center",
  },
});

type Props = { order: Object; brand: Object; task: Object };

const Receipt: React.FunctionComponent<Props> = ({ order, brand, task }) => {
  const [specifics, setSpecifics] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // const order = await fetchOneOrder(props.id);
      // if (order) {
      //   setWorkOrder(order || {});
      // }

      const specificFields = await findSpecificFieldsForOrder(order.id);
      if (specificFields) {
        setSpecifics(specificFields);
      }

      // const brandsData = await fetchBrands();
      // if (brandsData) {
      //   setBrands(brandsData);
      // }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Document>
      {specifics && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {/* <Image src={"https://drive.google.com/file/d/1DcWdgv_T0mGeqnVJR76trqbzUcn5YptC/view"} style={styles.image} /> */}
            <View style={styles.titleCont}>
              <Text style={styles.title}>Tu Pack</Text>
              <Text style={styles.subTitle}>Work Management</Text>
              <Text style={styles.subTitle}>System</Text>
            </View>
            <ClientInfo order={order} brand={brand} />
            <OrderSummary order={order} task={task} />
            <WarehouseNotes order={order} />
            <InitialClientDetails
              order={order}
              task={task}
              specifics={specifics}
            />
            <TaskSpecificDetails order={order} specifics={specifics} />
          </View>
        </Page>
      )}
    </Document>
  );
};

export default Receipt;
