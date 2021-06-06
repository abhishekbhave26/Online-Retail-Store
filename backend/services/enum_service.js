const help_status_type = {
    OPEN: "OPEN",
    RESOLVED: "RESOLVED"
}

const order_status_type = {
    SUBMITTED: "SUBMITTED",
    DELIVERY: "DELIVERY",
    CANCELLED: "CANCELLED",
    DELIVERED: "DELIVERED"
}

const payment_status_type = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    REFUNDED: "REFUNDED"
}

module.exports = { 
    help_status_type, 
    order_status_type,
    payment_status_type
};