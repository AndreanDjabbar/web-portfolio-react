import styles from './ProjectsStyles.module.css';
import electiVote from '../../assets/ElectiVote.png';
import caysMedicalStore from '../../assets/CaysMedicalStore.png';
import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={electiVote}
          link="https://github.com/AndreanDjabbar/ElectiVote"
          h3="ElectiVote"
          p="Voting App"
        />
        <ProjectCard
          src={caysMedicalStore}
          link="https://github.com/AndreanDjabbar/CaysMedicalStore"
          h3="CaysMedicalStore"
          p="Medical CRUD App"
        />
      </div>
    </section>
  );
}

export default Projects;
