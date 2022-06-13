import workOrders from '../../data/workOrders';
import brands from '../../data/brands';
import workers from '../../data/workers';
import { WIPObject } from '../../interfaces/WIPObject';

type Props = { orders: WIPObject[] };

const WIPTable: React.FunctionComponent<Props> = ({ orders }) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                      {workOrders.filter(
                        (wo) => wo.id === order.id
                      )[0]
                        ? workOrders.filter(
                            (wo) => wo.id === order.id
                          )[0].name
                        : 'null'}
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
                    {console.log(order.assigned_to)}
                    <span>
                      {workers.filter(
                        (worker) => worker.id === order.assigned_to
                      )[0]
                        ? workers.filter(
                            (worker) =>
                              worker.id === order.assigned_to
                          )[0].name
                        : null}
                    </span>
                  </div>
                </td>
                {/* target time */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    {console.log(order.target_time)}
                    <span>{order.target_time} minutes</span>
                  </div>
                </td>
                {/* brand */}
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <span>
                      {
                        brands.filter(
                          (brand) => brand.id === order.brand_id
                        )[0].name
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
                    <button
                      className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                      value={order.id}
                    >
                      Finish
                    </button>
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
