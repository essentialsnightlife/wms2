import { WIPObject } from '../../../interfaces/WIPObject';
import Link from 'next/link';

type Props = {
  orders: WIPObject;
  workers: any;
  workTasks: any;
  brands: any;
};

const WIPTable: React.FunctionComponent<Props> = ({
  orders,
  workers,
  workTasks,
  brands,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">Date Started</th>
        <th className="py-3 px-6 text-left">Expected Finish Date</th>
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-center">Task</th>
        <th className="py-3 px-6 text-center">Units / Quantity</th>
        <th className="py-3 px-6 text-center">Assigned To</th>
        <th className="py-3 px-6 text-center">Target Time</th>
        <th className="py-3 px-6 text-center">Brand (Actual)</th>
        <th className="py-3 px-6 text-center">Initial Cost</th>
        <th className="py-3 px-6 text-center">Complete Order</th>
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
                {/* order time accpeted */}
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {(order.start_time as any)
                        .slice(0, 19)
                        .replace(/T/g, ' ')}
                    </span>
                  </div>
                </td>
                {/* expected finish date */}
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>
                      {(order.expected_finish_date as any)
                        .slice(0, 19)
                        .replace(/T/g, ' ')}
                    </span>
                  </div>
                </td>
                {/* tracking id */}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {order.tracking_id}
                    </span>
                  </div>
                </td>
                {/* work order */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {
                        workTasks.find(
                          (task: any) =>
                            task.id === order.work_task_id
                        )?.name
                      }
                    </span>
                  </div>
                </td>
                {/* units */}
                <td className="py-3 px-6 text-center">
                  <span className="font-medium">
                    {order.initial_units_or_quantity}
                  </span>
                </td>

                {/* assigned to */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {
                        workers.find(
                          (worker: any) =>
                            worker.id === order.assigned_to_id
                        )?.name
                      }
                    </span>
                  </div>
                </td>
                {/* target time */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>{order.target_time} minutes</span>
                  </div>
                </td>
                {/* brand */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {
                        brands.find(
                          (brand: any) => brand.id === order.brand_id
                        )?.name
                      }
                    </span>
                  </div>
                </td>
                {/* intiial cost */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>£{order.initial_cost}</span>
                  </div>
                </td>
                {/* button */}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link href={`/finish/${order.id}`}>
                      <button
                        className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                        value={order.id}
                      >
                        Finish
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default WIPTable;
