const { MockGithub, Act } = require("@kie/mock-github");
const path = require("path");

// have to use arrayContaining because on GHA act records post clean up actions as well   
test("micro image", async () => {
  const mockGithub = new MockGithub({
    repo: {
      micro: {
        files: [
          {
            src: path.join(__dirname, "micro-test.yml"),
            dest: ".github/workflows/tests.yml",
          },
          {
            src: path.join(process.cwd(), "action.yml"),
            dest: "action.yml",
          },
        ],
      },
    },
  });

  await mockGithub.setup();

  const act = new Act(mockGithub.repo.getPath("micro"));
  const result = await act.runEvent("push");

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: expect.stringContaining("actions/checkout@v2"),
        status: 0,
        output: "",
      },
      { name: expect.stringContaining("Setup act cli"), status: 0, output: "" },
      {
        name: expect.stringContaining("Install nektos/act"),
        status: 0,
        output: expect.any(String),
      },
      {
        name: expect.stringContaining("Add nektos/act to path"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Setup Act - Micro image"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Run act"),
        status: 0,
        output: expect.stringContaining(
          "Stage  Job ID  Job name  Workflow name  Workflow file  Events"
        ),
      },
    ])
  );

  await mockGithub.teardown();
});

test("medium image", async () => {
  const mockGithub = new MockGithub({
    repo: {
      medium: {
        files: [
          {
            src: path.join(__dirname, "medium-test.yml"),
            dest: ".github/workflows/tests.yml",
          },
          {
            src: path.join(process.cwd(), "action.yml"),
            dest: "action.yml",
          },
        ],
      },
    },
  });

  await mockGithub.setup();

  const act = new Act(mockGithub.repo.getPath("medium"));
  const result = await act.runEvent("push");

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: expect.stringContaining("actions/checkout@v2"),
        status: 0,
        output: "",
      },
      { name: expect.stringContaining("Setup act cli"), status: 0, output: "" },
      {
        name: expect.stringContaining("Install nektos/act"),
        status: 0,
        output: expect.any(String),
      },
      {
        name: expect.stringContaining("Add nektos/act to path"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Setup Act - Medium image"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Run act"),
        status: 0,
        output: expect.stringContaining(
          "Stage  Job ID  Job name  Workflow name  Workflow file  Events"
        ),
      },
    ])
  );

  await mockGithub.teardown();
});

test("large image", async () => {
  const mockGithub = new MockGithub({
    repo: {
      large: {
        files: [
          {
            src: path.join(__dirname, "large-test.yml"),
            dest: ".github/workflows/tests.yml",
          },
          {
            src: path.join(process.cwd(), "action.yml"),
            dest: "action.yml",
          },
        ],
      },
    },
  });

  await mockGithub.setup();

  const act = new Act(mockGithub.repo.getPath("large"));
  const result = await act.runEvent("push");

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: expect.stringContaining("actions/checkout@v2"),
        status: 0,
        output: "",
      },
      { name: expect.stringContaining("Setup act cli"), status: 0, output: "" },
      {
        name: expect.stringContaining("Install nektos/act"),
        status: 0,
        output: expect.any(String),
      },
      {
        name: expect.stringContaining("Add nektos/act to path"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Setup Act - Large image"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Run act"),
        status: 0,
        output: expect.stringContaining(
          "Stage  Job ID  Job name  Workflow name  Workflow file  Events"
        ),
      },
    ])
  );

  await mockGithub.teardown();
});

test("invalid image", async () => {
  const mockGithub = new MockGithub({
    repo: {
      invalid: {
        files: [
          {
            src: path.join(__dirname, "invalid-test.yml"),
            dest: ".github/workflows/tests.yml",
          },
          {
            src: path.join(process.cwd(), "action.yml"),
            dest: "action.yml",
          },
        ],
      },
    },
  });

  await mockGithub.setup();

  const act = new Act(mockGithub.repo.getPath("invalid"));
  const result = await act.runEvent("push");

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: expect.stringContaining("actions/checkout@v2"),
        status: 0,
        output: "",
      },
      { name: expect.stringContaining("Setup act cli"), status: 1, output: "" },
      {
        name: expect.stringContaining("Install nektos/act"),
        status: 0,
        output: expect.any(String),
      },
      {
        name: expect.stringContaining("Add nektos/act to path"),
        status: 0,
        output: "",
      },
      {
        name: expect.stringContaining("Incorrect default runner size"),
        status: 1,
        output: "Incorrect default-runner-size",
      },
    ])
  );

  await mockGithub.teardown();
});
