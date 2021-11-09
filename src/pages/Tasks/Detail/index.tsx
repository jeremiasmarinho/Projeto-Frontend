import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import api from "../../../services/api";

import moment from "moment";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  update_at: Date;
}
interface IParams {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  function back() {
    history.goBack();
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    console.log(response);
    setTask(response.data);
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes da Tarefas</h1>
        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />

      <Card>
        <Card.Title>{task?.title}</Card.Title>
        <Card.Text>{task?.description}</Card.Text>
        <br />
        <Button
          size="sm"
          disabled
          variant={task?.finished ? "success" : "warning"}
        >
          {task?.finished ? "FINALIZADO" : "PENDENTE"}
        </Button>
        <br />
        <strong>Data de Cadastro:</strong>
        <Button size="sm" disabled variant="info">
          {formateDate(task?.created_at)}
        </Button>
        <strong>Data de Atualização:</strong>
        <Button size="sm" disabled variant="info">
          {formateDate(task?.update_at)}
        </Button>
        <br />
      </Card>
    </div>
  );
};

export default Detail;
