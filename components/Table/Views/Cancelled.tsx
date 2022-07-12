import { QueueObject } from '../../../interfaces/QueueObject';
import { Row } from '../Row';
import { RowButton } from '../RowButton';

type Props = { orders: QueueObject; workTasks: any };

const CancelledTable: React.FunctionComponent<Props> = ({
  orders,
  workTasks,
}) => (
  <table className="min-w-max w-full table-auto">
    <thead>
      <tr className="bg-red-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">ID</th>
        <th className="py-3 px-6 text-left">Start Date</th>
        <th className="py-3 px-6 text-center">Brand Entry</th>
        <th className="py-3 px-6 text-center">Work Task</th>
        <th className="py-3 px-6 text-center">Decline Reason</th>
        <th className="py-3 px-6 text-center">See All</th>
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
                    order.start_time
                      ? String(
                          order.start_time
                            .slice(0, 19)
                            .replace(/T/g, ' ')
                        )
                      : null
                  }
                />
                <Row input={order.brand_entry} />
                <Row
                  input={
                    workTasks.find(
                      (task: any) => task.id === order.work_task_id
                    )?.name
                  }
                />
                <Row input={order.decline_reason} />
                <RowButton link={'#'} text="All Details" />
              </tr>
            );
          })
        : null}
    </tbody>
  </table>
);

export default CancelledTable;
