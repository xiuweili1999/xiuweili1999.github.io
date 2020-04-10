fetch(" https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json") // replace this with the food safety data set
  .then((response) => {
    console.log("response information", response);
    return response;
  })

  .then((data) => data.json()) // this is an "implicit return" - we're returning the results of the Fetch request to the next step.

  .then((data) => {
    // this is an explicit return. If I want my information to go further, I'll need to use the "return" keyword before the brackets close
    console.log(data);
    return data; // <- this will pass the data to the next "then" statement when I'm ready.
  })

  .then((data) => {
    console.log("# of entries:", data.length);
    return data;
  })

  //from lecture
  .then((data) => {
    return data.reduce((res, cur) => {
      if (!res[cur.category]) {
        res[cur.category] = [];
      }
      res[cur.category].push(cur);
      return res;
    }, {});
  })

  .then((data) => {
    const newData = Object.entries(data).map((v, key) => {
      console.log(v)
      return {
        label: v[0],
        y: v[1].length,
      };
    });
    return newData;
  })

  .then((data) => {
    //https://canvasjs.com/javascript-charts/ charting library used  
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "dark1", 
      title: {
        text: "Let's Find Somewhere to Eat",
      },
      axisX: {
        labelFontSize: 13,
        interval: 1,
      },
      axisY: {
        labelFontSize: 25,
        interval: 10,
        scaleBreaks: {
          customBreaks: [
            {
              startValue: 20,
              endValue: 35,
            },
            {
              startValue: 60,
              endValue: 120,
            },
            {
              startValue: 160,
              endValue: 220,
            },
          ],
        },
      },
      data: [
        {
          type: "bar",
          dataPoints: data,
        },
      ],
    });
    chart.render();
  });
