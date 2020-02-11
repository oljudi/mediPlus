let boxSchedule = '#cons1Scheduler'
renderSchedule(boxSchedule)

function selectConsul(n) {
  switch (n) {
    case 1:
      boxSchedule = '#cons1Scheduler'
      renderSchedule(boxSchedule)
      break
    case 2:
      boxSchedule = '#cons2Scheduler'
      renderSchedule(boxSchedule)
      break
    case 3: 
      boxSchedule = '#cons3Scheduler'
      renderSchedule(boxSchedule)
      break
    case 4:
      boxSchedule = '#cons4Scheduler'
      renderSchedule(boxSchedule)
      break
  }
}

function renderSchedule(box) {
  YUI().use(
    'aui-scheduler',
    (Y) => {
      const events = []
      const agendaView = new Y.SchedulerAgendaView()
      const eventRecorder = new Y.SchedulerEventRecorder({
        on: {
          save: (e) => {'save', console.log(e.details[0].newSchedulerEvent.changed)},
          edit: (e) => {'edit', console.log(e.details[0].newSchedulerEvent.changed)},
          delete: (e) => {'delete', console.log(e.details[0].newSchedulerEvent.changed)}
        } 
      })
      new Y.Scheduler(
        {
          activeView: agendaView,
          boundingBox: box,
          date: new Date(),
          eventRecorder: eventRecorder,
          items: events,
          render: true,
          views: [agendaView]
        }
      )
    }
  )
}
