
class CTodos {
    constructor(){
        // Formulaire d'ajout
        this.todosName = document.getElementById('add_todos')
        this.todosDescription = document.getElementById('add_todos_description')
        this.todosAddSubmit = document.getElementById('add_todos_submit');
        this.todosAddSubmit.addEventListener('click',()=>{ this.addTodo() });
        this.todos = document.getElementById('todos');
        // Evenement de suppression de toutes les taches a faire
        document.getElementById('delete_todos').addEventListener('click',()=>{
            this.setEmptyTodo();
        });
        // Récupération des données
        this.data = this.getLocalStorage();
        // Rcupération de l'index
        this.current_id = Math.max(...this.data.map(d => d.id),0)+1 
        // Affichage des taches à faire
        this.showTodos()
    }

    /// Sauvegarde des données
    setLocalStorage(){ localStorage.setItem('todos',JSON.stringify(this.data)) }

    /// Récupération des données    
    getLocalStorage(){ return JSON.parse(localStorage.getItem('todos') || "[]") }
    
    /// Affichage des taches à faire
    showTodos(){
        for (const k in this.data) this.showTodo(this.data[k])
    }
    /// Affichage de la tache à faire
    showTodo(data){
        let ch_id,ch_name,ch_desc,ch_btn;
        ch_id = document.createElement('span');
        ch_id.setAttribute('data-id',data.id);
        ch_id.innerText = data.id;
        ch_name = document.createElement('span');
        ch_name.setAttribute('data-id',data.id);
        ch_name.innerText = data.name;
        ch_desc = document.createElement('span');
        ch_desc.setAttribute('data-id',data.id);
        ch_desc.innerText = data.desc;
        ch_btn = document.createElement('button');
        ch_btn.setAttribute('data-id',data.id);
        ch_btn.addEventListener('click',(e)=> { this.deleteTodo(e) });
        ch_btn.innerText = 'Supprimer';
        this.todos.append(ch_id);
        this.todos.append(ch_name);
        this.todos.append(ch_desc);
        this.todos.append(ch_btn);
    }

    /// Ajout d'un tache a faire
    addTodo(){
        ///// Verification des données
        if (this.todosName.value.length==0){
            alert('Veuillez spécifier une tache à faire');
            return;
        }
        if (this.todosDescription.value.length==0){
            alert('Veuillez spécifier une description pour la tache à faire');
            return;
        }
        ////// Confection de l'objet de la tache à faire
        let add_todo = {
            'id':this.current_id,
            'name':this.todosName.value,
            'desc':this.todosDescription.value
        }
        /// Affichage de la nouvelle tache
        this.showTodo(add_todo);

        /// Ajout aux données 
        this.data.push(add_todo);        
        /// Sauvegarde
        this.setLocalStorage();
        /// Augementation de l'index
        this.current_id++;

        this.todosName.value = '';
        this.todosDescription.value = '';
    }

    deleteTodo(e){
        let id = e.target.getAttribute('data-id');
        if (id==undefined) return;
        // Suppression de la tache a supprimer
        this.data = this.data.filter(d => d.id!==id);
        // Sauvegarde
        this.setLocalStorage();
        /// Suppression des elements concernant la tache a supprimer
        let del_objets = document.querySelectorAll(`[data-id="${id}"]`);
        for (const del_objet of del_objets) del_objet.remove();
    }

    setEmptyTodo(){
        // Suppression de toutes les données
        this.data=[];
        // Sauvegarde
        this.setLocalStorage();
        // Suppression de l'affichage de toutes les taches
        let del_objets = document.querySelectorAll(`*[data-id]`);
        for (const del_objet of del_objets) del_objet.remove(); }
}

const Todos = new CTodos