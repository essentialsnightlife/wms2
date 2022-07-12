import { QueueObject } from '../../../interfaces/QueueObject';
import { Row } from '../Row';
import { RowButton } from '../RowButton';

type Props = { orders: QueueObject; tasks: QueueObject };

const NewOrderTable: React.FunctionComponent<Props> = ({
  orders,
  tasks,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Submission Date</th>
        <th className="py-3 px-6 text-center">Work Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">
          Brand (Customer Entry)
        </th>
        <th className="py-3 px-6 text-center">Approve or Deny</th>
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
                    order.created_at
                      ? String(
                          order.created_at
                            .slice(0, 19)
                            .replace(/T/g, ' ')
                        )
                      : null
                  }
                />
                <Row
                  input={
                    tasks.find(
                      (task) => task.id === order.work_task_id
                    )?.name
                  }
                />
                <Row input={order.initial_units_or_quantity} />
                <Row input={order.brand_entry} />
                <RowButton
                  link={`/wo_pending/${order.id}`}
                  text="Action"
                />
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default NewOrderTable;
