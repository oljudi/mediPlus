// $(document).ready(function () {
//   $('.tabs').tabs()
// })

const resourcesList = ["Owner", "Room", "Priority"]

$(function() {
  var scheduler = $("#scheduler")
    .dxScheduler({
      dataSource:[] ,
      views: ["workWeek"],
      currentView: "workWeek",
      currentDate: new Date(2017, 4, 22),
      startDayHour: 9,
      endDayHour: 19,
      resources: [
        {
          fieldExpr: "roomId",
          allowMultiple: true,
          dataSource: [
            {
              text: "Room 1",
              id: 1,
              color: "#00af2c"
            },
            {
              text: "Room 2",
              id: 2,
              color: "#56ca85"
            },
            {
              text: "Room 3",
              id: 3,
              color: "#8ecd3c"
            }
          ],
          label: "Room"
        },
        {
          fieldExpr: "priorityId",
          allowMultiple: true,
          dataSource: [
            {
              text: "High priority",
              id: 1,
              color: "#cc5c53"
            },
            {
              text: "Low priority",
              id: 2,
              color: "#ff9747"
            }
          ],
          label: "Priority"
        },
        {
          fieldExpr: "ownerId",
          allowMultiple: true,
          dataSource: [    {
            text: "Samantha Bright",
            id: 1,
            color: "#727bd2"
        }, {
            text: "John Heart",
            id: 2,
            color: "#32c9ed"
        }, {
            text: "Todd Hoffman",
            id: 3,
            color: "#2a7ee4"
        }, {
            text: "Sandra Johnson",
            id: 4,
            color: "#7b49d3"
        }],
          label: "Owner"
        }
      ],
      height: 600
    })
    .dxScheduler("instance")
      .on('appointmentAdded', (e) => console.log(e))


  $("#resources-selector").dxRadioGroup({
    items: resourcesList,
    value: resourcesList[0],
    layout: "horizontal",
    onValueChanged: function(e) {
      var resources = scheduler.option("resources");

      for (var i = 0; i < resources.length; i++) {
        resources[i].useColorAsDefault = resources[i].label == e.value;
      }

      scheduler.repaint();
    }
  });
});
