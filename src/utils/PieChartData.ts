export const generatePieChartData = (bookingsLength: number, availableSlots: number) => {
    return [
      { name: "Booked", value: bookingsLength },
      { name: "Available", value: availableSlots },
    ];
  };