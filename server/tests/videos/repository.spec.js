// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const VideoRepository = require("../../database/models/VideoRepository");

// Test suite for VideoRepository
describe("VideoRepository", () => {
  // Test: Check if VideoRepository extends AbstractRepository
  test("VideoRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(VideoRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.video is an instance of VideoRepository
  test("tables.video = new VideoRepository", async () => {
    // Assertions
    expect(tables.video instanceof VideoRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'video' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake video data
    const fakeVideo = {
      title: "foo",
      url: "127.0.0.1",
      image: "127.0.0.1",
      description: "test video",
      is_connected: 1,
      category_id: 1,
    };

    // Call the create method of the video repository
    const returned = await tables.video.create(fakeVideo);

    // Assertions
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'video' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the video repository
    const returned = await tables.video.readAll();

    // Assertions
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'video' table based on id
  test("read => select with id", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the video repository
    const returned = await tables.video.read(0);

    // Assertions
    expect(returned).toStrictEqual(rows[0]);
  });
});
