import React from 'react';
import {shallow} from 'enzyme';

import {Client} from 'app/api';
import OrganizationRepositories from 'app/views/settings/organizationRepositories/organizationRepositories';

describe('OrganizationRepositories', function() {
  it('renders without providers', function() {
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        itemList={[]}
        repoConfig={{}}
        organization={TestStubs.Organization()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with github provider', function() {
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        repoConfig={{providers: [TestStubs.GitHubRepositoryProvider({id: 'github'})]}}
        itemList={[]}
        organization={TestStubs.Organization()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a repository', function() {
    Client.addMockResponse({
      url: '/organizations/org-slug/repos/',
      body: [TestStubs.Repository()],
    });
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        repoConfig={{providers: [TestStubs.GitHubRepositoryProvider({id: 'github'})]}}
        itemList={[TestStubs.Repository()]}
        organization={TestStubs.Organization()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
