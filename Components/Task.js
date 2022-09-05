
export default function Task({ tasks }) {
    return (
        <fieldset className="space-y-5 mt-5">
            {tasks.map((task) => {
                let checked = task.completed;
                return (
                    <div key={task.id} className="relative flex items-start border-b py-2">
                        <div className="flex items-center h-5">
                            <input
                                id="task"
                                name="task"
                                checked={checked ? 'checked' : ''}
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <span className="text-gray-500">{task.title}</span>
                        </div>
                    </div>
                )
            })}
        </fieldset>
    )
}