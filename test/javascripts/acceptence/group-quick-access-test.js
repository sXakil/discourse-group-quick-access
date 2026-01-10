import { test } from "qunit";
import { visit } from "@ember/test-helpers";
import { acceptance, exists } from "discourse/tests/helpers/qunit-helpers";

acceptance("Group Quick Access", function (needs) {
  needs.settings({ group_quick_access_enabled: true });
  needs.user();

  test("Group quick access buttons works", async function (assert) {
    await visit("/");
    assert.ok(
      exists("#group-quick-access"),
      "quick access container is present"
    );
  });
});
