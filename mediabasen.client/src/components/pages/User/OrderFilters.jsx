import React, { useEffect } from "react";
import orderService from "../../../services/orderService";
import orderHelper from "../../../utils/orderHelper";

export default function OrderFilters({
  filter,
  setFilter,
  shippedOrdersCount,
  setShippedOrdersCount,
  reservedOrdersCount,
  unshippedOrdersCount,
  setUnshippedOrdersCount,
  setReservedOrdersCount,
  setPage,
}) {
  useEffect(() => {
    async function getOrderCounts() {
      const result = await orderService.getOrderCounts();

      setShippedOrdersCount(result.shippedOrdersCount);
      setUnshippedOrdersCount(result.unshippedOrdersCount);
      setReservedOrdersCount(result.reservedOrdersCount);
    }

    getOrderCounts();
  }, []);

  const btnBaseClasses = "p-2 rounded-full";

  return (
    <div className="flex justify-between">
      <button
        onClick={() => {
          setFilter(orderHelper.orderFilterOptions.all);
          setPage(1);
        }}
        className={`${btnBaseClasses} ${
          filter == orderHelper.orderFilterOptions.all ? "bg-accent" : "bg-dark"
        }`}>
        Alla ({shippedOrdersCount + unshippedOrdersCount + reservedOrdersCount})
      </button>
      <button
        onClick={() => {
          setFilter(orderHelper.orderFilterOptions.unpaid);
          setPage(1);
        }}
        className={`${btnBaseClasses} ${
          filter == orderHelper.orderFilterOptions.unpaid
            ? "bg-accent"
            : "bg-dark"
        }`}>
        Obetalda ({reservedOrdersCount})
      </button>
      <button
        onClick={() => {
          setFilter(orderHelper.orderFilterOptions.unshipped);
          setPage(1);
        }}
        className={`${btnBaseClasses} ${
          filter == orderHelper.orderFilterOptions.unshipped
            ? "bg-accent"
            : "bg-dark"
        }`}>
        Behandlas ({unshippedOrdersCount})
      </button>
      <button
        onClick={() => {
          setFilter(orderHelper.orderFilterOptions.shipped);
          setPage(1);
        }}
        className={`${btnBaseClasses} ${
          filter == orderHelper.orderFilterOptions.shipped
            ? "bg-accent"
            : "bg-dark"
        }`}>
        Skickade ({shippedOrdersCount})
      </button>
    </div>
  );
}
