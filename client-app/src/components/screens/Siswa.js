import React from 'react'
import '../../App.css'
import {Link, Redirect} from 'react-router-dom'

export default class Siswa extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            url : 'http://localhost:8000/students/',
            viewCompleted: false,
            inputSiswa : false,
            updateSiswa : false,
            detailSiswa : false,
            siswaData : [],
            dataUpdate : 0,
            dataDetail : 0,

            // UPDATE
            nis : null,
            fullname : "",
            id_minat : null,
            math : null,
            science : null,
            indonesian : null
        };
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
        // console.log("COK", this.state.fullname)
    }

    onUpdate = e =>{
        e.preventDefault()

        fetch(this.state.url+this.state.nis+"/", {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id : this.state.nis,
                fullname : this.state.fullname,
                id_minat : 1,
                score_math : this.state.math,
                score_science : this.state.science,
                score_indonesian : this.state.indonesian
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("UPDATE", result)
        }).catch(err => {
            console.log(err)
        })
    }

    toggleInput(){
        console.log(this.state.data)
        if (this.state.inputSiswa === true) {
            this.setState({
                inputSiswa: false
            });
        } else {
            this.setState({
                inputSiswa: true
            });
        }
    }

    toggleUpdate(id){
        this.setState(
            {
                dataUpdate: id
            },
            () => {
                console.log(this.state.dataUpdate);
            }
        );
        if (this.state.updateSiswa === true) {
            this.setState({
                updateSiswa: false
            });
        } else {
            this.setState({
                updateSiswa: true
            });
        }
    }

    toggleDetail(id){
        this.setState(
            {
                dataDetail: id
            },
            () => {
                console.log(this.state.dataDetail);
            }
        );
        if (this.state.detailSiswa === true) {
            this.setState({
                detailSiswa: false
            });
        } else {
            this.setState({
                detailSiswa: true
            });
        }
    }

    toggleDelete(id){
        fetch(this.state.url+id+"/", {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        fetch("http://localhost:8000/clusters/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                siswaData : result.results
            })
            // console.log("NYOBA", result[0][1])
            // result.map(i => {
            //     console.log("NYOBA", i[1])
            // })
        })
        .catch(err => {
            console.log(err)
        })

    }

    render(){
        const {nis, fullname, id_minat,
            math, science,  indonesian
        }  =  this.state
        return(
            <div className="container">
                <div className="section">
                    <div className="row"
                        style={{
                            borderBottom:"1px solid grey"
                        }}
                    >
                        <h3 className="left">Siswa</h3>
                        <i onClick={() => this.toggleInput()}
                            className="medium right material-icons">add_circle
                        </i>
                        <div>
                            {this.state.inputSiswa === true ? (
                                <div>
                                    <FormTambah/>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th>NIS</th>
                                    <th>Nama</th>
                                    <th>Minat</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                this.state.siswaData.map((item, i) =>{ 
                                    return(
                                    <>
                                        <tr key={i.id}>
                                            <td>{item.id}</td>
                                            <td onClick={() => this.toggleDetail(item.id)}>
                                                {item.fullname}
                                            </td>
                                            {item.id_minat == 1 &&
                                                <td>Matematika</td>
                                            }
                                            {item.id_minat == 2 &&
                                                <td>IPA</td>
                                            }
                                            {item.id_minat == 3 &&
                                                <td>B. Indonesia</td>
                                            }
                                            <td>
                                                <i className="i-edit  material-icons"
                                                    onClick={() => this.toggleUpdate(item.id)}>
                                                edit</i>
                                                <i className="i-delete material-icons"
                                                    onClick={() => this.toggleDelete(item.id)}>    
                                                delete</i>
                                            </td>
                                        </tr>
                                        {this.state.detailSiswa == true &&
                                        this.state.dataDetail === item.id ? (
                                        <>
                                            <tr>
                                                <td colSpan="4">
                                                    Detail Siswa
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    NIS : 
                                                </td>
                                                <td colSpan="2">
                                                    {item.id}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Nama Lengkap :
                                                </td>
                                                <td colSpan="2">
                                                    {item.fullname}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Minat :
                                                </td>
                                                <td colSpan="2">
                                                    {item.id_minat == 1 &&
                                                        <td>Matematika</td>
                                                    }
                                                    {item.id_minat == 2 &&
                                                        <td>IPA</td>
                                                    }
                                                    {item.id_minat == 3 &&
                                                        <td>B. Indonesia</td>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Kelas :
                                                </td>
                                                <td colSpan="2">
                                                    {item.student_class}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Nilai Matematika :
                                                </td>
                                                <td colSpan="2">
                                                    {item.score_math}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Nilai IPA :
                                                </td>
                                                <td colSpan="2">
                                                    {item.score_science}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    Nilai B. Indonesia :
                                                </td>
                                                <td colSpan="2">
                                                    {item.score_indonesian}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" type="text">
                                                    {Number.parseInt(item.cluster, 10) == 0 &&
                                                        <td>Siswa ini masuk pada kelas ekstrakurikuler Matematika</td>
                                                    }
                                                    {Number.parseInt(item.cluster, 10) == 1 &&
                                                        <td>Siswa ini masuk pada kelas ekstrakurikuler IPA</td>
                                                    }
                                                    {Number.parseInt(item.cluster, 10) == 3 &&
                                                        <td>Siswa ini masuk pada kelas ekstrakurikuler B. Indonesia</td>
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                        ) : null }

                                        
                                        {this.state.updateSiswa == true &&
                                        this.state.dataUpdate === item.id ? (
                                            <>
                                            <tr>
                                                <td className="input-field col s3">
                                                    <input name="nis" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder={item.id}
                                                        value={nis}
                                                        onChange={this.handleChange}/>
                                                    <label for="nis">NIS</label>
                                                </td>
                                                <td colSpan="2" className="input-field col s9">
                                                    <input name="fullname" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder={item.fullname}
                                                        value={fullname}
                                                        onChange={this.handleChange}/>
                                                    <label for="nama">Fullname</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="input-field col s12">
                                                    <ListMinat/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="input-field col s4">
                                                    <input name="math" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder={item.score_math}
                                                        value={math}
                                                        onChange={this.handleChange}/>
                                                    <label for="math">Nilai Matematika</label>
                                                </td>
                                                <td className="input-field col s4">
                                                    <input name="science" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder={item.score_science}
                                                        value={science}
                                                        onChange={this.handleChange}/>
                                                    <label for="science">Nilai IPA</label>
                                                </td>
                                                <td className="input-field col s4">
                                                    <input name="indonesian" 
                                                        type="text" 
                                                        className="validate"
                                                        placeholder={item.score_indonesian}
                                                        value={indonesian}
                                                        onChange={this.handleChange}/>
                                                    <label for="indonesian">Nilai B. Indonesia</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3">
                                                    <button class="btn waves-effect waves-light col s3" 
                                                        type="submit" 
                                                        onClick={this.onUpdate}
                                                        name="action">
                                                            Submit
                                                        <i class="material-icons right">send</i>
                                                    </button>
                                                </td>
                                            </tr>
                                            </>
                                        ) : null }
                                    </>
                                    )  
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

class FormTambah extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            minatData : [],
            nis : null,
            fullname : "",
            id_minat : null,
            student_class : "",
            math : null,
            science : null,
            indonesian : null
        }
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        console.log("COK", this.state)

        fetch("http://localhost:8000/students/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id : this.state.nis,
                fullname : this.state.fullname,
                id_minat : this.state.id_minat,
                student_class : this.state.student_class,
                score_math : this.state.math,
                score_science : this.state.science,
                score_indonesian : this.state.indonesian,
                cluster:null
            })
        })
        .then(res => res.json())
        .then(result => {
            console.log("POST", result)
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        fetch("http://localhost:8000/interests/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                minatData : result.results
            }) 
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        const {nis, fullname, id_minat, student_class,
            math, science,  indonesian
        }  =  this.state

        return(
        <div className="row">
            <form onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                    <h4>Tambah Siswa</h4>

                    <div className="input-field col s3">
                        <input name="nis" 
                            type="text" 
                            className="validate"
                            value={nis}
                            onChange={this.handleChange}/>
                        <label for="nis">NIS</label>
                    </div>
                    <div className="input-field col s9">
                        <input name="fullname" 
                            type="text" 
                            className="validate"
                            value={fullname}
                            onChange={this.handleChange}/>
                        <label for="nama">Fullname</label>
                    </div>
                    
                    <div className="input-field col s6">
                        <select className="browser-default"
                            name="id_minat"
                            value={this.state.id_minat}
                            onChange={this.handleChange}>
                            <option disabled selected>Pilih Minat</option>
                        {
                            this.state.minatData.map(item => {
                                return(
                                    <>
                                    <option 
                                        name="id_minat"
                                        value={item.id}>
                                            {item.name}
                                    </option>
                                    </>
                                )
                            })
                        }
                        </select>
                    </div>

                    <div className="input-field col s6">
                        <select className="browser-default"
                            name="student_class"
                            value={this.state.student_class}
                            onChange={this.handleChange}>
                                <option disabled selected>Pilih Kelas</option>
                                <option name="student_class" value="1">1 (Satu)</option>
                                <option name="student_class" value="2">2 (Dua)</option>
                                <option name="student_class" value="3">3 (Tiga)</option>
                                <option name="student_class" value="4">4 (Empat)</option>
                                <option name="student_class" value="5">5 (Lima)</option>
                                <option name="student_class" value="6">6 (Enam)</option>
                        </select>
                    </div>

                    <div className="input-field col s4">
                        <input name="math" 
                            type="text" 
                            className="validate"
                            value={math}
                            onChange={this.handleChange}/>
                        <label for="math">Nilai Matematika</label>
                    </div>
                    <div className="input-field col s4">
                        <input name="science" 
                            type="text" 
                            className="validate"
                            value={science}
                            onChange={this.handleChange}/>
                        <label for="science">Nilai IPA</label>
                    </div>
                    <div className="input-field col s4">
                        <input name="indonesian" 
                            type="text" 
                            className="validate"
                            value={indonesian}
                            onChange={this.handleChange}/>
                        <label for="indonesian">Nilai B. Indonesia</label>
                    </div>

                    <div>
                        <button class="btn waves-effect waves-light col s3" 
                            type="submit" 
                            name="action">
                                Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

class ListMinat extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            minatData : []
        }
    }

    componentDidMount(){
        fetch("http://localhost:8000/interests/", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        .then(res => res.json())
        .then(result => {
            this.setState({
                minatData : result.results
            }) 
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <>
                <select className="browser-default">
                    <option value="" disabled selected>Pilih Minat</option>
                {
                    this.state.minatData.map(item => {
                        return(
                            <>
                            <option value={item.id}>{item.name}</option>
                            </>
                        )
                    })
                }
                </select>
            </>
        );
    }
}