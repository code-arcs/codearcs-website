package de.stekoe.oasis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import de.stekoe.oasis.model.Project;

/**
 * Provides access to Project in database
 */
public interface ProjectRepository extends PagingAndSortingRepository<Project, String> {
    /**
     * Finds projects by its name.
     *
     * @param projectName The name of a project to lookup
     * @return A list of projects with the given name
     */
    List<Project> findByName(String projectName);

    /**
     * Finds projects by a given user id.
     * All projects a user is involved in, which means he/she is a project member of the project, will
     * be returned.
     *
     * @param userId The id of the user
     * @return A list of projects which the users is involved
     */
    @Query("SELECT p FROM Project p JOIN p.projectTeam pt JOIN pt.user u WHERE u.id = ?1)")
    List<Project> findByUser(String userId);
}