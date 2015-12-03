package de.stekoe.oasis.service;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.Assert.assertThat;

import javax.inject.Inject;

import de.stekoe.oasis.model.*;
import org.junit.Assert;
import org.junit.Test;

import de.stekoe.oasis.AbstractBaseTest;

public class CriterionPageServiceTest extends AbstractBaseTest {

    @Inject
    CriterionPageService criterionPageService;

    @Inject
    CriterionService criterionService;

    @Inject
    ProjectService projectService;

    @Test
    public void savePageWithElements() throws Exception {
        Project project = new Project();
        project.setName("Projekt");
        projectService.save(project);

        CriterionPage page = new CriterionPage();
        page.setProject(project);

        NominalScaledCriterion nsc = new NominalScaledCriterion();
        nsc.setName("NSC");

        nsc.setCriterionPage(page);

        criterionPageService.save(page);

        final String id = page.getId();
        page = criterionPageService.findOne(id);
        Assert.assertNotNull(page);

        assertThat(page.getPageElements().size(), is(equalTo(1)));
        assertThat(page.getPageElements().get(0).getCriterionPage(), is(equalTo(page)));
    }

    @Test
    public void moveDown() throws Exception {
        final CriterionPage page = new CriterionPage();

        NominalScaledCriterion nsc = new NominalScaledCriterion();
        nsc.setName("NSC 1");
        nsc.setCriterionPage(page);

        nsc = new NominalScaledCriterion();
        nsc.setName("NSC 2");
        nsc.setCriterionPage(page);

        page.move(page.getPageElements().get(1), OrderableUtil.Direction.DOWN);

        page.getPageElements().get(0).getName().equals("NSC 1");
    }
}