import {
  BlockStack,
  InlineStack,
  Button,
  Card,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { useRouter } from "next/router";

const InfoPage = () => {
  return (
    <>
      <Page title="Open Source Wishlist App">
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd">Wishlist App Repo</Text>
                <Text>Take a look at the code for the wishlist app</Text>
                <InlineStack align="end">
                  <Button
                    external
                    icon={ExternalIcon}
                    variant="primary"
                    onClick={() => {
                      window?.open(
                        "https://github.com/kinngh/shopify-wishlist-live-app",
                        "_blank"
                      );
                    }}
                  >
                    GitHub
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd">Heading</Text>
                <Text>Regular Text Content</Text>
                <InlineStack align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert("Button pressed");
                    }}
                  >
                    Button
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default InfoPage;
