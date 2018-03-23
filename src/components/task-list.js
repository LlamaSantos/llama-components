import { link } from 'glamor';

const React = require('react')
const PropTypes = require('prop-types')
const css = require('./styles.css')
require('./globals.css?raw')
const { Draggable, Sortable } = require('@shopify/draggable')

const Task = (props) => {
  const { done, title, description } = props
  return (
    <li className={css.task}>
      <section className={css.taskContent }>
        <header>{ title }</header>
        <div>{ description }</div>
        <input type="checkbox" checked={done} onChange={() => {}}/>
      </section>
    </li>
  )
}
Task.propTypes = {
  done: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const classes = {
  draggable: `.${css.task}`,
  droppable: `.${css.tasks}`
}

module.exports = class TaskList extends React.Component {
  componentDidMount() {
    const tasks = Array.from(document.getElementsByClassName(css.tasks))
    this.sortable = new Sortable(tasks, {
      draggable: classes.draggable,
      droppable: classes.droppable,
      mirror: {
        constrainDimensions: true,
      },
      classes: {
        
      }
    })
    this.sortable.on('drag:start', (...args) => console.info('sortable', 'drag:start', ...args))
    this.sortable.on('sortable:sorted', (...args) => console.info('sortable', 'sortable:sorted', ...args))
  }

  render() {
    const tasks = [
      { title: 'lorem ipsum', description: 'asdfsadfasd', done: false },
      { title: 'blarg piwats', description: 'asdfsdf', done: false },
      { title: 'DO IT', description: 'asdfasdfasd sadfasdfas asdfasdfasd', done: true },
      { title: 'Dayam Gina!', description: 'asdfsadf fasdfasdfa asdfsadf', done: false  }
    ]

    return <React.Fragment>
      <ul className={css.tasks}>
        {
          tasks.map((task, index) => 
            <Task
              key={index}
              done={task.done}
              title={task.title}
              description={task.description}
            />
          )
        }
      </ul>
      <ul className={css.tasks}></ul>
    </React.Fragment>
  }
}