# frozen_string_literal: true

# name: group-quick-access
# about: Adds a quick access bar for specified groups with color coded dots
# version: 0.0.1
# authors: sXakil
# url: https://github.com/sXakil/discourse-group-quick-access
# required_version: 2.7.0

register_asset "stylesheets/group-quick-access.scss"

enabled_site_setting :group_quick_access_enabled

after_initialize do
  # Make specified groups with color codes available to the connector
  add_to_serializer(:site, :quick_access_groups) do
    # Format: group1#ed1c24|group2#ffc90e
    link_template = SiteSetting.group_quick_access_link_template
    quick_groups = SiteSetting.group_quick_access_groups
    
    groups_data = quick_groups.split('|').map do |entry|
      parts = entry.strip.split('#')
      group_name = parts[0]
      color_code = parts[1] || 'ffffff'  # Default white if no color specified
      
      { name: group_name, color: "##{color_code}" }
    end

    # Generate links using the template
    groups_data.each do |group|
      group[:link] = link_template.gsub('{group_name}', group[:name])
    end
    
    # Get group names for query
    group_names = groups_data.map { |g| g[:name] }
    
    # Query groups
    groups = Group.where(name: group_names)
                  .visible_groups(scope.user)
                  .pluck(:name, :id, :full_name)
    
    # Combine with color data
    groups.map do |name, id, full_name|
      color_data = groups_data.find { |g| g[:name] == name }
      {
        name: name,
        id: id,
        full_name: full_name || name,
        color: color_data ? color_data[:color] : '#ffffff',
        link: color_data ? color_data[:link] : nil
      }
    end
  end
end
