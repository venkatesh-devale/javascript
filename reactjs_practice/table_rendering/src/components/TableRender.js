import React, {Component} from 'react';

class TableRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                {
                    roll_number:1,
                    student_name: "Venkatesh"
                },
                {
                    roll_number:2,
                    student_name: "Rajiv"
                },
                {
                    roll_number:3,
                    student_name: "Pradnyesh"
                },
                {
                    roll_number:4,
                    student_name: "Rahul"
                }
            ]
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(s) {
        alert("Student Roll No and Name:"+ s.roll_number + " " + s.student_name);
    }

    render() {

        var finalArrayToShowInTable  = null;

        finalArrayToShowInTable = this.state.students.map((s) => {
            return (
                <tr key={s.roll_number}>
                    <td>
                        {s.roll_number}
                    </td>
                        
                    <td>
                        {s.student_name}
                    </td>

                    <td>
                        <button onClick={()=>this.handleButtonClick(s)}>
                            Click Me!
                        </button>
                    </td>
                </tr>
            );
        });

        return(
            <div className="TableRender">
                <table className='table table-hover'>
                    <thead>
                        <tr className='table-secondary'>
                            <th id="roll_number"></th>
                            <th id="student_name"></th>
                            <th id="btn_show_student"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {finalArrayToShowInTable}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableRender;