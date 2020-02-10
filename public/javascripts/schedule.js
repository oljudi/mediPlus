YUI().use(
  'aui-scheduler',
  function(Y) {
    let events = [ // arreglo que se carga con los eventos 
      // {
      //   color: "#8d8",
      //   content: 'Earth Day Lunch',
      //   startDate: new Date(2020, 1, 22, 12),
      //   endDate: new Date(2020,1, 22, 13),
      // },
    ];

    let agendaView = new Y.SchedulerAgendaView();
    let weekView = new Y.SchedulerWeekView();
    let monthView = new Y.SchedulerMonthView();

    let eventRecorder = new Y.SchedulerEventRecorder({
      on: {
        save: (e) => {'save', console.log(e.details[0].newSchedulerEvent.changed)},
        edit: (e) => {'edit', console.log(e.details[0].newSchedulerEvent.changed)},
        delete: (e) => {'delete', console.log(e.details[0].newSchedulerEvent.changed)}
      } 
    })

    new Y.Scheduler(
      {
        activeView: weekView,
        boundingBox: '#homeScheduler',
        date: new Date(),
        eventRecorder: eventRecorder,
        items: events,
        render: true,
        views: [agendaView,weekView,monthView]
      }
    );
  }
);