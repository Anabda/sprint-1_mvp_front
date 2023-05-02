/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/aparelhos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("myTableBody").innerHTML = "";
        data.aparelhos.forEach(item => insertList(item.codigo, item.nome, item.potencia, item.voltagem, item.comodo, item.amperagem, item.diametro_fio))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputCode, inputName, inputPower, inputVoltage, inputRoom, inputAmperage, inputDiameter) => {
    const formData = new FormData();
    formData.append('codigo', inputCode);
    formData.append('nome', inputName);
    formData.append('potencia', inputPower);
    formData.append('voltagem', inputVoltage);
    if (inputRoom != "") formData.append('comodo', inputRoom);
    if (inputAmperage != "") formData.append('amperagem', inputAmperage);
    if (inputDiameter != "") formData.append('diametro_fio', inputDiameter);
    
    let url = 'http://127.0.0.1:5000/aparelho';
    fetch(url, {
      method: 'post',
      body: formData
    })
    .then((response) => {
      console.log("response: ",response.json());
      console.log("status:",response.ok);
      if (response.ok) {
        alert("Aparelho adicionado com sucesso!");
        getList();
      }
      else {
        alert("Erro: item não adicionado");
      }
    })
    .catch((error) => {
      console.error('Error:', error);        
    });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza que deseja excluir o aparelho?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Aparelho removido com sucesso!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/aparelho?codigo=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo aparelho 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {
    let inputCode = document.getElementById("newCode");
    let inputName = document.getElementById("newName");
    let inputPower = document.getElementById("newPower");
    let inputVoltage = document.getElementById("newVoltage");
    let inputRoom = document.getElementById("newRoom").value;
    let inputAmperage = document.getElementById("newAmperage").value;
    let inputDiameter = document.getElementById("newDiameter").value;
    
    let camposObrigatorios = [inputCode, inputName, inputPower, inputVoltage];
    let error = false;
    for (let i = 0; i < camposObrigatorios.length; i++) {
      let campoObrigatorio = camposObrigatorios[i]
      if (campoObrigatorio.value === '') {
        campoObrigatorio.classList.add('newItemFieldError');
        campoObrigatorio.classList.remove('newItemField');
        error = true;
      } else {
        campoObrigatorio.classList.add('newItemField');
        campoObrigatorio.classList.remove('newItemFieldError');
      }
    } 
    if (error) {
      alert("Erro: campos obrigatórios não preenchidos");
    } else {
      postItem(inputCode.value, inputName.value, inputPower.value, inputVoltage.value, inputRoom, inputAmperage, inputDiameter)
    }    
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir itens na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (code, name, power, voltage, room, amperage, diameter) => {
    var item = [code, name, power, voltage, room, amperage, diameter]
    var table = document.getElementById('myTableBody');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newCode").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newPower").value = "";
    document.getElementById("newVoltage").value = "";
    document.getElementById("newRoom").value = "";
    document.getElementById("newAmperage").value = "";
    document.getElementById("newDiameter").value = "";
  
    removeElement()
  }