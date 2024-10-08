import React, { useState, useEffect } from "react";
import orderService from "../../../services/orderService";
import UserOrder from "./UserOrder";
import orderHelper from "../../../utils/orderHelper";
import OrderFilters from "./OrderFilters";
import LoadSpinner from "../../globals/LoadSpinner";
import ButtonPrimary from "../../globals/ButtonPrimary";

export default function UserOrders() {
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const [orders, setOrders] = useState();
  const [filter, setFilter] = useState(orderHelper.orderFilterOptions.all);
  const [page, setPage] = useState(1);
  const [shippedOrdersCount, setShippedOrdersCount] = useState(0);
  const [unshippedOrdersCount, setUnshippedOrdersCount] = useState(0);
  const [reservedOrdersCount, setReservedOrdersCount] = useState(0);

  useEffect(() => {
    async function getOrders() {
      if (page == 1) {
        setFetchingOrders(true);
      }
      const data = await orderService.getOrders(filter, page);

      if (page == 1) {
        setOrders(data);
        setFetchingOrders(false);
      } else {
        setOrders([...orders, ...data]);
      }
    }

    getOrders();
  }, [filter, page]);

  function doesMoreOrdersExist() {
    switch (filter) {
      case orderHelper.orderFilterOptions.all:
        return (
          orders.length <
          shippedOrdersCount + unshippedOrdersCount + reservedOrdersCount
        );
      case orderHelper.orderFilterOptions.shipped:
        return orders.length < shippedOrdersCount;
      case orderHelper.orderFilterOptions.unshipped:
        return orders.length < unshippedOrdersCount;
    }
  }

  return (
    <section className="flex flex-col gap-y-3 max-w-xl mx-auto w-full">
      <h2 className="text-xl font-bold w-full">Dina ordrar</h2>
      {shippedOrdersCount + unshippedOrdersCount + reservedOrdersCount ===
        0 && <p>Du har inga ordrar!</p>}
      <OrderFilters
        {...{
          filter,
          setFilter,
          shippedOrdersCount,
          setShippedOrdersCount,
          unshippedOrdersCount,
          setUnshippedOrdersCount,
          reservedOrdersCount,
          setReservedOrdersCount,
          setPage,
        }}
      />
      {fetchingOrders && <LoadSpinner className={`mx-auto mt-3`} />}
      {orders && orders.length > 0 && !fetchingOrders && (
        <>
          <ul>
            {orders.map((order) => (
              <UserOrder key={`order-${order.id}`} {...{ order }} />
            ))}
          </ul>
          {doesMoreOrdersExist() && (
            <ButtonPrimary
              className="mx-auto w-fit"
              onClick={() => {
                setPage(page + 1);
              }}>
              Hämta fler
            </ButtonPrimary>
          )}
        </>
      )}
      {orders && orders.length === 0 && (
        <p>Inga ordrar hittades på din filtrering!</p>
      )}
    </section>
  );
}
