import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import moment from 'moment';

import './index.css';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  update_at: Date;
}
  const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const history = useHistory()

  useEffect(() => {
    loadTasks()
  }, [])
  
  async function loadTasks(){
        
    const response = await api.get('/tasks')
    console.log(response)
    setTasks(response.data)
  
  }
 
  function formateDate(date: Date){
    return moment(date).format("DD/MM/YYYY")
  }

  function newTask () {
    history.push('/tarefas_cadastro')
  }

  function editTask(id: number){
    history.push(`/tarefas_cadastro/${id}`)
  }

  return (
    
    <div className="container">
      
        <br/>
        <div className="task-header">
          <h1>Lista de Tarefas</h1>
          <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
        </div>
   
        <Table striped bordered hover className="text-center">
            
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Data de Atualização</th>
                <th>Status</th>
                <th>Ações</th>
                
              </tr>
              </thead>
              <tbody>
                {
                  

                  tasks.map(task => (
                    <tr key={task.id}>
                    <td>{ task.id }</td>
                    <td>{ task.title }</td>
                    <td>{ formateDate(task.update_at)}</td>
                   <td>

                   <Button size="sm" disabled variant={ task.finished ? "success" : "warning"}>
                     {task.finished ? "FINALIZADO" : "PENDENTE"}

                   </Button>

                    </td>
                    <td> 
                      <Button size="sm" onClick={() => editTask(task.id)}>Editar</Button>{' '} 
                      <Button size="sm" variant="success">Finalizar</Button> {' '} 
                      <Button size="sm" variant="info">Visualizar</Button> {' '} 
                      <Button size="sm" variant="danger">Remover</Button> 
                      </td>            
                    </tr>
                  ))
                }
               
              </tbody>
            

        </Table>
   
    </div>   

    

        )
}

export default Tasks;