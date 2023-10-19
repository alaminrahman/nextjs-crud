'use client'
import { insertSkills, updateSkill, deleteSkill } from "@/utils/api";
import { useState, useEffect } from "react";

export default function Home() {

  const [skill, setSkill] = useState('');
  const [skillsData, setSkillData] = useState([]);
  const [skillId, setSkillId] = useState('');

  const skillChange = (e) => {
    setSkill(e.target.value)
  }
  function clearData(){
    setSkill('')
    setSkillId('')
  }

  const submitHandler = async () => {
      if(skillId != ''){
        const res = await updateSkill({ id: skillId, name: skill });
        fetchSkills();
        clearData();
        return 0;
      }
      
      await insertSkills({ name: skill });
      fetchSkills();
      clearData();
    }
  
    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills(){
        let res = await fetch('https://nextjs-crud-gpm8.vercel.app/api/skills')
        let data = await res.json();
        setSkillData(data)
    }

    function editSkill(id){
      skillsData.filter((item) => {
        if(item.id == id){
          setSkill(item.name)
        }
      })

      setSkillId(id);

    }

    const handleDeleteSkill = async (id) => {
      try {
        // Call your deleteSkill API function here, not itself
        await deleteSkill(id);
    
        // Fetch the updated skills list
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    };

  return (
    <>

      <div className="container mx-auto">
        
        <div>
          <input 
              type="text" 
              placeholder="Type here" 
              name="skill"
              value={ skill }
              onChange={ skillChange } 
              className="input input-bordered w-full max-w-xs mx-2" />

            <button className="btn" onClick={ submitHandler }>Submit</button>
        </div>

      </div>

    
      <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {
                    skillsData.length > 0 && 
                    skillsData.map((item, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                            <td>
                                <button className="btn btn-accent mx-2" onClick={ () => editSkill(item.id) }>Edit</button>
                                <button className="btn btn-error " onClick={ () => handleDeleteSkill(item.id) }>Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
      </div>
    
    </>
  )
}
