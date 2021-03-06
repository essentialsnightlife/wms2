import { NotStartedObject } from '../../../interfaces/NotStartedObject';
import { RowButton } from '../RowButton';

type Props = { orders: NotStartedObject; tasks: any; brands: any };
const NotStartedTable: React.FunctionComponent<Props> = ({
  orders,
  tasks,
  brands,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-yellow-300 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Time Accepted</th>
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-center">Work Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Brand (Actual)</th>
        <th className="py-3 px-6 text-center">Target Time</th>
        <th className="py-3 px-6 text-center">Initial Cost</th>
        <th className="py-3 px-6 text-center">Start Order</th>
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
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {order.time_accepted
                        ? (order.time_accepted as any)
                            .slice(0, 19)
                            .replace(/T/g, ' ')
                        : 'null'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    {
                      tasks.find(
                        (task) => task.id === order.work_task_id
                      )?.name
                    }
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {' '}
                      {
                        brands.find(
                          (b: any) => b.id === order.brand_id
                        )?.name
                      }
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.target_time} minutes</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>??{order.initial_cost}</span>
                  </div>
                </td>
                <RowButton
                  link={`/start_wo/${order.id}`}
                  text={'Start '}
                />
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default NotStartedTable;
