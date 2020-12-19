<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

//AÇÕES DO CRUD
if($postjson['requisicao'] == 'listar'){ //Listagem
  
    $query = mysqli_query($mysqli, "select * from usuarios order by id desc limit $postjson[start], $postjson[limit]");
  
 	while($row = mysqli_fetch_array($query)){ 
 		$dados[] = array(
 			'id' => $row['id'], 
 			'nome' => $row['nome'],
			'email' => $row['email'],
            'idade' => $row['idade'], 
            'cidade' => $row['cidade']
 	    );
    }

    if($query){
            $result = json_encode(array('success'=>true, 'result'=>$dados));

        }else{
            $result = json_encode(array('success'=>false));
        }
        echo $result;
}else if($postjson['requisicao'] == 'add'){ //adicionar

     $query = mysqli_query($mysqli, "INSERT INTO usuarios SET nome = '$postjson[nome]', email = '$postjson[email]', idade = '$postjson[idade]', cidade = '$postjson[cidade]', senha = '$postjson[senha]' ");

     $id = mysqli_insert_id($mysqli);
    
    if($query){
            $result = json_encode(array('success'=>true, 'id'=>$id));
        }else{
            $result = json_encode(array('success'=>false));
        }
        echo $result;
    
}else if($postjson['requisicao'] == 'editar'){ //editar

        $query = mysqli_query($mysqli, "UPDATE usuarios SET nome = '$postjson[nome]', email = '$postjson[email]', idade = '$postjson[idade]', cidade = '$postjson[cidade]' where id = '$postjson[id]'");

        $id = mysqli_insert_id($mysqli);
        
    if($query){
            $result = json_encode(array('success'=>true, 'id'=>$id));
        }else{
            $result = json_encode(array('success'=>false));
        }
        echo $result;
} else if($postjson['requisicao'] == 'excluir'){ //excluir

        $query = mysqli_query($mysqli, "DELETE from usuarios where id = '$postjson[id]'");

        $id = mysqli_insert_id($mysqli);
        
    if($query){
            $result = json_encode(array('success'=>true, 'id'=>$id));
        }else{
            $result = json_encode(array('success'=>false));
        }
        echo $result;
    }