import React, { useEffect } from "react";
import orderService from "../../../services/orderService";
import orderHelper from "../../../utils/orderHelper";

export default function OrderFilters({
  filter,
  setFilter,
  shippedOrdersCount,
  setShippedOrdersCount,
  unshippedOrdersCount,
  setUnshippedOrdersCount,
  setPage,
}) {
  useEffect(() => {
    async function getOrderCounts() {
      const result = await orderService.getOrderCounts();

      setShippedOrdersCount(result.shippedOrdersCount);
      setUnshippedOrdersCount(result.unshippedOrdersCount);
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
        Alla ({shippedOrdersCount + unshippedOrdersCount})
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
