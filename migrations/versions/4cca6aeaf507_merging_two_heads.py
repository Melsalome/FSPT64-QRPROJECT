"""merging two heads

Revision ID: 4cca6aeaf507
Revises: 02d4ed8d1f4f, 260a85ae08dc
Create Date: 2024-06-16 01:28:59.872588

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4cca6aeaf507'
down_revision = ('02d4ed8d1f4f', '260a85ae08dc')
branch_labels = None
depends_on = None


def upgrade():
    # op.create_table('user',
    # sa.Column('id', sa.Integer(), nullable=False),
    # sa.Column('first_name', sa.String(length=255), nullable=True),
    # sa.Column('last_name', sa.String(length=255), nullable=True),
    # sa.Column('name_of_the_restaurant', sa.String(length=255), nullable=True),
    # sa.Column('email', sa.String(length=255), nullable=False),
    # sa.Column('password', sa.String(length=255), nullable=False),
    # sa.Column('is_active', sa.Boolean(), nullable=False),
    # sa.PrimaryKeyConstraint('id'),
    # sa.UniqueConstraint('email')
    # )
    # ### end Alembic commands ###
    # op.create_table('restaurant',
    #     sa.Column('id', sa.Integer(), nullable=False),
    #     sa.Column('name', sa.String(length=100), nullable=False),
    #     sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('menu',
    #     sa.Column('id', sa.Integer(), nullable=False),
    #     sa.Column('name', sa.String(length=100), nullable=False),
    #     sa.Column('description', sa.Text(), nullable=True),
    #     sa.Column('price', sa.Float(), nullable=False),
    #     sa.Column('category', sa.String(length=50), nullable=False),
    #     sa.Column('restaurant_id', sa.Integer(), nullable=False),
    #     sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id'], ),
    #     sa.PrimaryKeyConstraint('id')
    # )
    # op.create_table('table',
    #     sa.Column('id', sa.Integer(), nullable=False),
    #     sa.Column('number', sa.String(length=10), nullable=False),
    #     sa.Column('restaurant_id', sa.Integer(), nullable=False),
    #     sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id'], ),
    #     sa.PrimaryKeyConstraint('id')
    # )

    op.create_table('order',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('restaurant_id', sa.Integer(), nullable=False),
        sa.Column('table_id', sa.Integer(), nullable=False),
        sa.Column('comment', sa.Text(), nullable=True),
        sa.Column('payment_method', sa.String(length=50), nullable=False),
        sa.Column('total_price', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id']),
        sa.ForeignKeyConstraint(['table_id'], ['table.id']),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('order_item',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('menu_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
      
        sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table(
        'invoice',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('restaurant_id', sa.Integer(), nullable=False),
        sa.Column('table_id', sa.Integer(), nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        # sa.Column('date', sa.DateTime(), nullable=False),
        # sa.Column('payment_method', sa.String(50), nullable=True),
        # sa.Column('total_price', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['restaurant_id'], ['restaurant.id']),
        sa.ForeignKeyConstraint(['table_id'], ['table.id']),
        sa.ForeignKeyConstraint(['order_id'], ['order.id']),
        sa.PrimaryKeyConstraint('id')
    )
  
def downgrade():
    op.drop_table('invoice')
    op.drop_table('order_item')
    op.drop_table('order')
    # op.drop_table('user')
    # ### end Alembic commands ###
    # op.drop_table('menu')
    # op.drop_table('restaurant')
    # op.drop_table('table')
