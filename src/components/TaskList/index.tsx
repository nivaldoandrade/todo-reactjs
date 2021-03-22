import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiCheck, FiTrash2 } from 'react-icons/fi';

import './style.scss';

interface Task {
	id: string;
	name: string;
	isCompleted: boolean;
}

export default function TaskList() {
	const [newTask, setNewTask] = useState('');
	const [isNewTask, setIsNewTask] = useState(false);
	const [taskList, setTaskList] = useState<Task[]>([]);

	function handleAddNewTask() {
		if (!newTask) {
			setIsNewTask(state => true);
			return
		}

		const task = {
			id: uuidv4(),
			name: newTask,
			isCompleted: false,
		};

		setIsNewTask(state => false);
		setNewTask('');
		setTaskList(state => [...state, task])
	}

	function handleToggleTaskChecked(id: string) {
		const updatedTask = taskList.map(task => {
			if (task.id === id) {
				task.isCompleted = !task.isCompleted
			}

			return task
		})

		setTaskList(updatedTask);
	}

	function handleDeletetTask(id: string) {
		const filteredTask = taskList.filter(task => (!(task.id === id)));

		setTaskList(filteredTask);
	}

	return (
		<div className="tasklistContainer">
			<header>
				<h2>Minhas tarefas</h2>

				<div className="AddTask">
					{isNewTask ? (
						<span>Coloque um nome para tarefa*</span>
					) : ''}
					<input
						type="text"
						placeholder="Digite uma nova tarefa"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button
						type="button"
						onClick={handleAddNewTask}
					>
						<FiCheck />
					</button>
				</div>
			</header>

			<main>
				<ul>
					{taskList.map(task => (
						<li key={task.id}>
							<div className={task.isCompleted ? 'checked' : ''}>
								<label className="checkboxContainer">
									<input
										type="checkbox"
										readOnly
										checked={task.isCompleted}
										onClick={() => handleToggleTaskChecked(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.name}</p>
							</div>

							<button
								type="button"
								onClick={() => handleDeletetTask(task.id)}
							>
								<FiTrash2 size={16} />
							</button>
						</li>
					))}
				</ul>
			</main>
		</div>
	)
}
