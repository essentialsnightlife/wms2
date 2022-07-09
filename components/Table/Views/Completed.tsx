// import { PDFDownloadLink } from "@react-pdf/renderer";
import Link from "next/link";
import { QueueObject } from "../../../interfaces/QueueObject";
import Receipt from "../../Receipt";
import { Row } from "../Row";
import { RowButton } from "../RowButton";
import { PDFDownloadLink } from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js";

type Props = { orders: QueueObject; tasks: any; brands: any };

const CompletedTable: React.FunctionComponent<Props> = ({
  orders,
  tasks,
  brands,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Finish Date</th>
        <th className="py-3 px-6 text-center">Work Task</th>
        <th className="py-3 px-6 text-center">Brand</th>
        <th className="py-3 px-6 text-center">Final Units / Quantity</th>
        <th className="py-3 px-6 text-center">Time Taken</th>
        <th className="py-3 px-6 text-center">Receipt Link</th>
        <th className="py-3 px-6 text-center">See All Details</th>
      </tr>
    </thead>
    <tbody className="text-gray-600 text-sm font-light">
      {orders
        ? orders.map((order) => {
            return (
              <tr
                key={order.tracking_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <Row input={order.tracking_id} />
                <Row
                  input={
                    order.finish_time
                      ? String(
                          order.finish_time.slice(0, 19).replace(/T/g, " ")
                        )
                      : null
                  }
                />
                <Row input={"insert work task here"} />
                <Row input={"insert brand"} />
                <Row input={order.final_units_or_quantity} />
                <Row input={`${order.minutes_taken} mins`} />
                <td>
                  <div className="flex justify-center">
                    <PDFDownloadLink
                      document={
                        <Receipt
                          order={order}
                          brand={brands.find((x) => x.id === order.brand_id)}
                          task={tasks.find((x) => x.id == order.work_task_id)}
                        />
                      }
                      fileName="recipt"
                      className="px-3 py-1 w-full text-center font-bold bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                    >
                      Get Receipt
                    </PDFDownloadLink>
                  </div>
                </td>
                <RowButton link={"#"} text="All Details" />
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default CompletedTable;
